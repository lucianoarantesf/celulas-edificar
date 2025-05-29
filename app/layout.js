
export const metadata = {
  title: 'Gerenciamento de Células',
  description: 'Listagem e cadastro de células',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Bootstrap CSS */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        />
        {/* Bootstrap JS */}
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          defer
        ></script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
