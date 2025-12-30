# Estudo

## Pipes

São uma ferramenta para processar dados de entrada (input data) antes que eles
cheguem ao destino final, que geralmente é o método do Controller (o manipulador
da rota).

São meio que como filtros ou tubos de conexão que ficam entre a requisição HTTP
do cliente e a lógica do código.

1. As Duas Principais Funções Os Pipes têm dois casos de uso principais:

- Transformação: Transformam os dados de entrada para o formato desejado.
  - Exemplo: Converter uma string "123" vinda da URL para um número inteiro 123.

- Validação: Avaliam os dados de entrada e, se forem válidos, deixam passar. Se
  não forem, lançam uma exceção (erro) imediatamente.
  - Exemplo: Verificar se o e-mail enviado no corpo da requisição tem um formato
    válido ou se a senha tem o número mínimo de caracteres.

2. Como Funcionam (O Fluxo) Quando uma requisição atinge um endpoint (rota) no
   NestJS:
   1. O NestJS verifica se há algum Pipe associado àquele método ou argumento.

   2. Se houver, o framework passa os argumentos para o Pipe antes de executar o
      método do Controller.

   3. Se for Transformação: O Pipe modifica o valor e o entrega pronto para o
      Controller.

   4. Se for Validação: O Pipe verifica o valor.
      - Sucesso: O Controller é executado.

      - Falha: O Pipe lança uma exceção (geralmente BadRequestException), e o
        NestJS

retorna um erro 400 para o usuário automaticamente, sem nem rodar o código do
Controller.

Nota: Isso é excelente para a arquitetura "Clean Code", pois mantém seus
Controllers limpos, focados apenas na lógica de negócio, sem precisar encher o
código de if/else para validar dados.

3. Pipes Nativos (Built-in Pipes)

O NestJS já vem com vários pipes prontos para uso, o que economiza muito tempo.
Os mais comuns são:

- ValidationPipe: O mais poderoso. Usa as bibliotecas class-validator e
  class-transformer para validar objetos complexos (DTOs).

- ParseIntPipe: Garante que o valor seja um número inteiro.

- ParseBoolPipe: Garante que o valor seja um booleano.

- ParseUUIDPipe: Garante que o valor seja um UUID válido.

- DefaultValuePipe: Define um valor padrão se o argumento for nulo ou
  indefinido.

5. Escopos de Ligação (Onde aplicar?) Você pode aplicar pipes em diferentes
   níveis:

- Nível de Parâmetro: Apenas para um argumento específico (como no exemplo do
  ParseIntPipe acima).

- Nível de Método: Para todo o método do controller (@UsePipes()).

- Nível de Controller: Para todas as rotas daquele controller.
 
- Global: Para toda a aplicação (muito comum para o ValidationPipe).
