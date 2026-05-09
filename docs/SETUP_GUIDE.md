# Guia de Configuração e Ambiente de Desenvolvimento (Setup Guide)

Este documento explica o que é necessário para um novo desenvolvedor configurar e rodar o projeto IService App (Frontend - React Native / Expo) na sua máquina e dispositivo físico (celular).

## 1. Pré-requisitos

Para rodar este projeto, você precisa ter instalado:
- **Node.js** (versão LTS recomendada: 18.x ou superior)
- **Git**
- **NPM** ou **Yarn**
- Dispositivo Android (ou Emulador)
- Conta no [Expo](https://expo.dev/)

---

## 2. Configurando as Variáveis de Ambiente (.env)

O aplicativo utiliza autenticação OAuth do Google e precisa de chaves de API secretas que não são (e nem devem ser) enviadas ao GitHub.

1. Na raiz do projeto, crie um arquivo chamado `.env` (você pode se basear no `.env.example`).
2. Para obter as chaves `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` e `EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID`, você precisará **falar com Kaique**, que gerencia as credenciais do Google Cloud Console.

> [!NOTE]
> **As chaves do Google (`client_id`) servem para toda a equipe!**
> Você não precisa de uma conta própria no Google Cloud. Basta colar no seu `.env` as mesmas chaves fornecidas pelo Kaique. O login funcionará perfeitamente no seu celular desde que você teste utilizando o APK oficial (Dev Client) fornecido pela equipe.

Exemplo de `.env`:
```env
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=chave_obtida_com_o_kaique.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=chave_obtida_com_o_kaique.apps.googleusercontent.com
```

---

## 3. Conexão com o Backend (API Local)

Se você estiver rodando o backend (Spring Boot / NestJS) localmente na sua máquina:
1. Abra o arquivo `src/services/api.ts`.
2. Altere o `baseURL` para o **IP da sua máquina** na rede Wi-Fi local. *Não use `localhost`*, pois o seu celular não vai encontrar a API do seu computador através de `localhost`.

Exemplo:
```typescript
const api = axios.create({
  // Mude para o SEU IP local (ex: 192.168.0.x) e a porta correta do seu backend
  baseURL: 'http://192.168.0.9:8404', 
});
```

---

## 4. Instalando e Rodando o Projeto

Após clonar o repositório, rode os seguintes comandos na raiz do app:

```bash
# 1. Instale as dependências
npm install

# 2. Inicie o servidor do Expo em modo de Desenvolvimento (Development Build)
npx expo start --dev-client
```

### Por que `--dev-client`?
O IService utiliza pacotes de código nativo (como o `@react-native-google-signin/google-signin`). O aplicativo *Expo Go* tradicional não suporta código nativo de terceiros. Por isso, geramos a nossa própria versão do aplicativo (um Dev Client).

---

## 5. Como rodar o aplicativo no Celular (Android)

Para testar o App no seu celular de verdade, não basta apenas baixar o *Expo Go*. Você precisará instalar o APK compilado do projeto.

> [!IMPORTANT]
> **Você NÃO precisa de acesso à conta Expo do Kaique para programar, testar ou usar o Login do Google.**
> Todo o seu fluxo de trabalho (criar telas, alterar lógica, conectar na API) é feito na sua máquina e refletido no seu celular via Wi-Fi.

### Passo a passo para o fluxo de desenvolvimento da equipe:
1. **Obtenha o APK:** Fale com o Kaique para ele te enviar o arquivo `.apk` de *Development* mais recente.
2. Instale esse APK no seu celular Android. *(A assinatura de segurança digital que o Google exige já vem embutida dentro desse APK)*.
3. Certifique-se de que o seu celular e o seu computador estão conectados à **mesma rede Wi-Fi**.
4. Rode `npx expo start --dev-client` no terminal do seu computador.
5. Pressione a tecla `s` no terminal para alternar para modo de escaneamento.
6. Abra o aplicativo que você instalou no celular, escaneie o QR Code exibido no terminal do computador ou digite o link que aparece no console (ex: `http://192.168.0.x:8081`).
7. **Pronto!** O aplicativo vai se conectar ao código que está rodando na sua máquina. Qualquer alteração que você salvar no VS Code aparecerá na tela do seu celular imediatamente.

---

## 6. (Apenas para o Kaique) Como gerar um novo Build Nativo
Se a equipe instalar **novas bibliotecas nativas** (algo que altera arquivos `.java` ou `.swift` do Android/iOS), os desenvolvedores não conseguirão gerar um novo APK nas máquinas deles sem quebrar a assinatura de segurança do Google.

Neste caso, o Kaique (ou quem tiver a senha do Expo da organização) deve gerar um novo build do Dev Client usando o EAS:
```bash
eas build -p android --profile development
```
*Isso fará o upload para a nuvem da Expo, criará um novo instalador (APK) com a assinatura oficial. Após finalizado, o Kaique deverá enviar o novo APK para a equipe instalar nos celulares.*
