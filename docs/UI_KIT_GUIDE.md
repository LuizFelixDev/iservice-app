# Guia do Design System e Componentes UI

Este guia explica como utilizar a nova estrutura de componentes do **IService** para criar e atualizar telas de forma padronizada, rápida e escalável.

## 1. Importações e Path Aliases

Para facilitar a importação de componentes, nós configuramos um *path alias* (`@/`). 
Sempre que precisar importar algo da pasta `src`, utilize `@/` em vez de caminhos relativos complexos como `../../components`.

**✅ Certo:**
```tsx
import { Screen, Typography, Button } from '@/components';
import { colors } from '@/colors/Colors';
```

**❌ Errado:**
```tsx
import { Screen, Typography, Button } from '../../components';
import { colors } from '../../../colors/Colors';
```

---

## 2. Componentes Base

### `<Screen />`
Todo componente de tela (Screen) deve utilizar o wrapper `<Screen>`. Ele já gerencia automaticamente o `SafeAreaView` e o `KeyboardAvoidingView` para garantir que a tela não quebre no celular e o teclado não cubra os inputs.

**Propriedades principais:**
- `scrollable` (boolean): Se `true`, envelopa o conteúdo em um `ScrollView`.
- `backgroundColor` (string): Cor de fundo da tela.

**Exemplo:**
```tsx
<Screen scrollable backgroundColor={colors.background}>
  <Typography variant="h1">Minha Tela</Typography>
</Screen>
```

### `<Typography />`
Nunca utilize o componente `<Text>` do React Native diretamente. Use o `<Typography>` para manter a consistência de fontes, tamanhos e pesos.

**Propriedades principais:**
- `variant`: `h1`, `h2`, `h3`, `body`, `caption`, `button`.
- `color`: Cor do texto (use o arquivo `colors`).
- `weight`: `400`, `500`, `600`, `bold`.
- `align`: `left`, `center`, `right`.

**Exemplo:**
```tsx
<Typography variant="h2" color={colors.primary} align="center">
  Bem-vindo
</Typography>
```

### `<Spacer />`
Chega de espalhar `marginTop` e `marginBottom` pelos estilos. Utilize o `<Spacer>` para dar espaçamentos verticais padrão entre elementos.

**Exemplo:**
```tsx
<Typography variant="h2">Título</Typography>
<Spacer size={16} />
<Typography variant="body">Subtítulo</Typography>
```

### `<Button />`
Botão padronizado da aplicação.

**Propriedades principais:**
- `variant`: `primary`, `outline`, `ghost`.
- `title` (string): Texto do botão.
- `onPress` (function): Ação ao clicar.
- `isLoading` (boolean): Se `true`, exibe um spinner e desabilita o botão.

**Exemplo:**
```tsx
<Button 
  title="Entrar" 
  variant="primary" 
  isLoading={false} 
  onPress={() => console.log('clicou')} 
/>
```

### `<ControlledInput />`
Para criar formulários com validação, estamos utilizando `react-hook-form` e `zod`. O `<ControlledInput>` se conecta automaticamente a essa estrutura.

**Exemplo de uso:**
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ControlledInput, Button, Screen } from '@/components';

// 1. Defina o Schema
const formSchema = z.object({
  email: z.string().email('E-mail inválido'),
});

export function Formulario() {
  // 2. Inicialize o hook
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (data) => console.log(data);

  return (
    <Screen>
      {/* 3. Utilize o ControlledInput */}
      <ControlledInput
        control={control}
        name="email"
        label="E-mail"
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
      />
      <Button title="Enviar" onPress={handleSubmit(onSubmit)} />
    </Screen>
  );
}
```

---

## 3. Cores (`@/colors/Colors`)

Sempre utilize a paleta de cores padrão em vez de inserir códigos hexadecimais ("#000") espalhados pelos estilos. 

- `colors.primary`: Laranja principal do app.
- `colors.background`: Fundo padrão de telas.
- `colors.surface`: Fundo de cartões e modais.
- `colors.text`: Texto padrão.
- `colors.error`: Mensagens de erro.

**Lembrete:** Ao precisar atualizar ou criar algo novo no Design System, verifique as definições existentes no arquivo `src/colors/Colors.ts` e evite duplicidade.
