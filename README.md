# 📋 Sistema de Credenciamento de Células Ministeriais

Este é um sistema web para **credenciamento, listagem e gerenciamento de células ministeriais**, desenvolvido utilizando **Next.js** com integração ao **Supabase** para persistência dos dados.

## 🚀 Funcionalidades

✅ Cadastro de células com informações completas  
✅ Máscara de telefone e CEP no formulário  
✅ Autocompletar endereço via **API ViaCEP**  
✅ Listagem de células em tabela responsiva  
✅ Paginação e seleção de quantidade de itens por página  
✅ Busca por texto livre (tipo grep search)  
✅ Ordenação clicando nos headers, com indicação asc/desc  
✅ Modal de cadastro com Bootstrap  
✅ Renderização responsiva para dispositivos móveis  
✅ Colapso das informações da tabela para telas pequenas  
✅ Integração completa com Supabase (CRUD via REST API)

---

## 🛠️ Tecnologias utilizadas

- **Next.js** 15 (App Router)
- **React** 18+
- **Bootstrap** 5
- **Supabase** (banco de dados e API)
- **API ViaCEP** (para preenchimento automático de endereço)

---

## ⚙️ Configuração do Supabase

Crie um arquivo `lib/supabase.js` com:

```js
export const SUPABASE_URL = "https://<your-project>.supabase.co";
export const SUPABASE_KEY = "<your-anon-or-service-key>";
export const supabaseHeaders = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json"
};
````

----

## ✅ Como usar
Clique no botão "Incluir" para abrir o modal de cadastro.

Preencha os campos. O CEP irá autocompletar o endereço.

Clique em Salvar.

Visualize, pesquise, ordene e navegue na listagem.

---

## 📦 Deploy


Este projeto é otimizado para deploy gratuito na Vercel.

---

## 🤝 Contribuição
Fork este repositório

Crie sua branch: git checkout -b feature/nova-feature

Commit: git commit -m 'Adiciona nova feature'

Push: git push origin feature/nova-feature

Abra um Pull Request
