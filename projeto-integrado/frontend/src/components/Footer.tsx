const Footer = () => {
  return (
    <footer className="pb-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-white/40 text-xs">
          © {new Date().getFullYear()} Todos os direitos reservados Roxedo
        </p>
      </div>
    </footer>
  );
};

export default Footer;
