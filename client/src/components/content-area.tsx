

interface ContentAreaProps {
    activeItem: string
  }
  
  export function ContentArea({ activeItem }: ContentAreaProps) {
    const renderContent = () => {
      switch (activeItem) {
        case "bienvenido":
          return (
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-full flex flex-col">
              <div className="p-8">
                <h1 className="text-4xl font-bold text-white mb-8">Bienvenido/a</h1>
              </div>
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="max-w-2xl">
                  <img
                    src="/students.jpg"
                    alt="Estudiantes felices dando pulgares arriba"
                    className="w-full h-auto rounded-lg shadow-lg"
                    onError={(e) => {
                      console.error('Error loading image:', e);
                      const img = e.currentTarget;
                      img.onerror = null; // prevent infinite loop
                      img.src = '/news-sas.jpg';
                    }}
                  />
                </div>
              </div>
            </div>
          )
        case "guia":
          return (
            <div className="p-8 h-full bg-gray-50">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">Guía</h1>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Guía de uso</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Bienvenido a la plataforma de estudiantes. Aquí encontrarás toda la información necesaria para navegar
                    y utilizar las herramientas disponibles.
                  </p>
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-700">Pasos para comenzar:</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Revisa la sección de bienvenida</li>
                      <li>Familiarízate con la interfaz</li>
                      <li>Inicia tu primera prueba cuando estés listo</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )
        case "iniciar-prueba":
          return (
            <div className="p-8 h-full bg-gray-50">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">Iniciar prueba</h1>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Preparación para la prueba</h2>
                <div className="space-y-4 text-gray-600">
                  <p>Estás a punto de comenzar tu evaluación. Asegúrate de tener todo lo necesario antes de proceder.</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-medium text-blue-800 mb-2">Requisitos:</h3>
                    <ul className="list-disc list-inside space-y-1 text-blue-700">
                      <li>Conexión estable a internet</li>
                      <li>Ambiente silencioso</li>
                      <li>Tiempo suficiente para completar</li>
                    </ul>
                  </div>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Comenzar prueba
                  </button>
                </div>
              </div>
            </div>
          )
        default:
          return null
      }
    }
  
    return <div className="flex-1 h-full">{renderContent()}</div>
  }
  