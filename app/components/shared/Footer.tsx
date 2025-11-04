export function Footer() {
  return (
    <footer className="relative mt-auto bg-linear-to-br from-gray-700 to-gray-900 border-t border-white/10 backdrop-blur-xl shadow-sm shadow-black/20">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
        {/* grid principal */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <FooterColumn
            title="Producto"
            links={["Características", "Precios", "Documentación"]}
          />
          <FooterColumn
            title="Empresa"
            links={["Acerca de", "Blog", "Carreras"]}
          />
          <FooterColumn
            title="Soporte"
            links={["Centro de Ayuda", "Contacto", "Estado del Sistema"]}
          />

          {/* social */}
          <div className="flex flex-col gap-3 sm:items-start">
            <h3 className="text-sm font-semibold text-white">Síguenos</h3>
            <div className="flex gap-3">
              {["twitter", "github", "linkedin"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/20 bg-linear-to-b from-white/90 to-slate-50/80 shadow-sm shadow-black/20 hover:shadow-[0_4px_12px_rgba(15,23,42,0.15)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span className="text-slate-700 text-sm capitalize">
                    {icon[0].toUpperCase()}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200/10 pt-6 text-center text-sm text-slate-200">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-white">Magic Product</span>.
            Todos los derechos reservados.
          </p>
          <p className="mt-1 text-slate-300">
            Desarrollado con <span className="text-white/90">Next.js</span> y{" "}
            <span className="text-white/90">Tailwind CSS</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-white">{title}</h3>
      <ul className="space-y-2 text-sm text-gray-200">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="transition-all duration-200 hover:text-white hover:translate-x-2 inline-block"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
