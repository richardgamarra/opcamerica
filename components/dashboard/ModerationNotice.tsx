export function ModerationNotice({ isEs }: { isEs: boolean }) {
  return (
    <p className="text-[11px] text-gray-400 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 mt-3">
      {isEs
        ? "Todas las publicaciones son revisadas. El contenido debe estar relacionado con OPC, emprendimiento o herramientas de negocio. Las cuentas que publiquen contenido inapropiado o que viole nuestras reglas seran canceladas."
        : "All submissions are reviewed before going live. Content must relate to OPC, entrepreneurship, or business tools. Accounts posting inappropriate or rule-breaking content will be cancelled."}
    </p>
  );
}
