function Layout({ children }) {
  return (
    <div className="max-w-9xl mx-auto px-4 md:px-12 space-y-12 py-8">
      {children}
    </div>
  );
}

export default Layout;