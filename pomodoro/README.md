## Conceitos importantes:

- css modules
- childrens
- react hooks
- local storage

## CSS Modules

'CSS Modules' é uma técnica que permite escrever estilos CSS de forma modular e
isolada para cada componente. Isso evita conflitos de nomes e facilita a
manutenção do código. Exemplo:

```tsx
import styles from './Componente.module.css';
function Componente() {
  return <div className={styles.classeDoComponente}>Conteúdo</div>;
}
```

## Childrens

'Childrens' é uma propriedade do React que permite passar elementos filhos para
um componente. É útil para criar componentes reutilizáveis e flexíveis. Exemplo:

```tsx
function ComponentePai({ children }) {
  return <div className='pai'>{children}</div>;
}
```

```tsx
<ComponentePai>
  <h1>Olá, mundo!</h1>
</ComponentePai>
```

## React Hooks

'React Hooks' são funções que permitem usar o estado e outros recursos do React
em componentes funcionais. Os hooks mais básicos são `useState`, `useEffect` e
`useContext`.

### UseState

Permite criar estados dentro de componentes funcionais. Retorna um array com o
estado atual e uma função para atualizar esse estado. Pode receber um valor
inicial ou uma função que retorna o valor inicial. A atualização do estado é
assíncrona.

#### prevState vs var+1

Ao atualizar o estado, é recomendado usar a função que recebe o estado anterior
como argumento, para garantir que o estado seja atualizado corretamente,
especialmente quando a atualização depende do estado anterior. Exemplo:

```tsx
setCount(prevCount => prevCount + 1);
```

Isso evita problemas quando várias atualizações de estado são feitas em rápida
sucessão. Caso contrário, se for usado `setCount(count + 1)`, pode haver
situações em que o valor de `count` não seja o esperado devido à natureza
assíncrona da atualização do estado. Exemplo:

```tsx
// Pode causar problemas
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
// count pode não ser incrementado corretamente
// Pois o valor de count pode não ser atualizado a tempo
// E apenas o último setCount será considerado
```

#### Lazy initialization

Se o valor inicial do estado for uma operação computacionalmente custosa, pode
ser passada uma função para o useState. Essa função será executada apenas na
montagem do componente. Exemplo:

```tsx
const [count, setCount] = useState(() => {
  // operação custosa
  return valorInicial;
});
```

### UseEffect

É executado sempre que o componente é renderizado. Pode ser controlado com o
array de dependências. Se o array de dependências estiver vazio, o useEffect
será executado apenas na montagem do componente. Se o array de dependências
tiver variáveis, o useEffect será executado sempre que essas variáveis mudarem.
O useEffect pode retornar uma função de limpeza que será executada antes do
componente ser desmontado ou antes do próximo efeito ser executado. Exemplo:

```tsx
useEffect(() => {
  // código a ser executado
  return () => {
    // código de limpeza
  };
}, [dependencias]);
```

### UseContext

Permite compartilhar dados entre componentes sem precisar passar props
manualmente em cada nível da árvore de componentes. É útil para temas,
autenticação e configurações globais. Exemplo:

```tsx
const MeuContexto = React.createContext(valorInicial);
function Componente() {
  const valor = useContext(MeuContexto);
  return <div>{valor}</div>;
}
```

#### Provedor de contexto

O provedor de contexto é um componente que envolve a árvore de componentes e
fornece o valor do contexto para todos os componentes filhos. Exemplo:

```tsx
<MeuContexto.Provider value={valor}>
  <ComponenteFilho />
</MeuContexto.Provider>
```

## Local Storage

O local storage é uma forma de armazenamento de dados persistente, ou seja, os
dados não serão deletados se o navegador for fechado, que permite que dados
sejam salvos diretamente no navegador.

Os dados são armazenados em um formato de chave-valor, sendo que o valor sempre
será armazenado no formato string, o que significa que na hora de acessar os
dados armazenados pode ser preciso fazer algum tipo de conversão. Exemplo:

```tsx
localStorage.setItem('chave', 'valor');
const valor = localStorage.getItem('chave');
localStorage.removeItem('chave');
localStorage.clear();
```

É importante lembrar que o local storage tem um limite de armazenamento, que
pode variar entre os navegadores, mas geralmente é em torno de 5MB por domínio.
Além disso, os dados armazenados no local storage são acessíveis por qualquer
script que rode na mesma origem, o que pode representar um risco de segurança se
dados sensíveis forem armazenados lá. Para usar o local storage em conjunto com
o React, é comum utilizar o hook `useEffect` para sincronizar o estado do
componente com os dados armazenados no local storage. Exemplo:

```tsx
const [valor, setValor] = useState(() => {
  return localStorage.getItem('chave') || '';
});

useEffect(() => {
  localStorage.setItem('chave', valor);
}, [valor]);
```

Dessa forma, o estado do componente será inicializado com o valor armazenado no
local storage e sempre que o estado for atualizado, o valor no local storage
será atualizado também.
