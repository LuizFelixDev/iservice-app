import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Animated,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { colors } from '../../colors/Colors';
import { Feather } from '@expo/vector-icons';

const { width} = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Problemas não têm hora marcada.',
    description: 'Precisa de um reparo urgente? Solicite um serviço e encontre profissionais qualificados perto de você em segundos.',
    icon: 'tool',
  },
  {
    id: '2',
    title: 'Aumente sua renda.',
    description: 'Ative o seu radar geográfico e receba notificações de pessoas precisando do seu talento a poucos quilômetros de distância.',
    icon: 'map-pin',
  },
  {
    id: '3',
    title: 'Você no controle.',
    description: 'Seja um cliente buscando ajuda ou um profissional oferecendo seus serviços. Alterne de perfil com um clique.',
    icon: 'sliders',
  },
];

export default function OnboardingScreen() {
  const navigation = useNavigation<any>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollToNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate('Login');
    }
  };

  const skip = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={skip} style={styles.skipButton}>
          <Typography variant="label" style={{ color: colors.secondary }}>
            Pular
          </Typography>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <FlatList
          data={SLIDES}
          renderItem={({ item }) => (
            <View style={styles.slide}>
              <View style={styles.iconContainer}>
                <Feather name={item.icon as any} size={80} color={colors.primary} />
              </View>
              <View style={styles.textContainer}>
                <Typography variant="h2" style={styles.title}>
                  {item.title}
                </Typography>
                <Typography variant="body" style={styles.description}>
                  {item.description}
                </Typography>
              </View>
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          {SLIDES.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 24, 8],
              extrapolate: 'clamp',
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                style={[styles.dot, { width: dotWidth, opacity }]}
                key={i.toString()}
              />
            );
          })}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={currentIndex === SLIDES.length - 1 ? 'Começar' : 'Avançar'}
            onPress={scrollToNext}
            variant="primary"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    alignItems: 'flex-end',
  },
  skipButton: {
    padding: 8,
  },
  content: {
    flex: 3,
  },
  slide: {
    width,
    alignItems: 'center',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  iconContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 0.4,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    color: colors.onSurface,
  },
  description: {
    textAlign: 'center',
    color: colors.onSurfaceVariant,
  },
  footer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginHorizontal: 4,
  },
  buttonContainer: {
    width: '100%',
  },
});
