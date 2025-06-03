import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const careers = await prisma.career.createMany({
    data: [
      {
        name: 'Medicina',
        description: 'Carreras relacionadas con salud y medicina',
      },
      {
        name: 'Diseño y Artes',
        description: 'Carreras creativas y artísticas',
      },
      { name: 'Ingeniería', description: 'Carreras técnicas y de ingeniería' },
      { name: 'Contaduría', description: 'Carreras de negocios y finanzas' },
    ],
    skipDuplicates: true,
  });

  const allCareers = await prisma.career.findMany();
  const [medicine, design, engineering, accounting] = allCareers;

  const questionsData = [
    {
      text: 'Prefieres actividades que involucren:',
      answers: [
        { content: 'Ayudar a personas enfermas', careerId: medicine.id },
        {
          content: 'Diseñar cosas visualmente atractivas',
          careerId: design.id,
        },
        { content: 'Resolver problemas técnicos', careerId: engineering.id },
        { content: 'Trabajar con números y finanzas', careerId: accounting.id },
      ],
    },
    {
      text: 'En tu tiempo libre prefieres:',
      answers: [
        { content: 'Leer sobre avances médicos', careerId: medicine.id },
        { content: 'Dibujar o crear arte', careerId: design.id },
        { content: 'Armar o reparar objetos', careerId: engineering.id },
        { content: 'Organizar tus gastos personales', careerId: accounting.id },
      ],
    },
    {
      text: 'Tu materia favorita en la escuela es:',
      answers: [
        { content: 'Biología', careerId: medicine.id },
        { content: 'Artes plásticas', careerId: design.id },
        { content: 'Matemáticas/Física', careerId: engineering.id },
        { content: 'Contabilidad', careerId: accounting.id },
      ],
    },
    {
      text: 'Te describirías como:',
      answers: [
        { content: 'Empático y compasivo', careerId: medicine.id },
        { content: 'Creativo e innovador', careerId: design.id },
        { content: 'Lógico y analítico', careerId: engineering.id },
        { content: 'Organizado y meticuloso', careerId: accounting.id },
      ],
    },
    {
      text: 'En un proyecto grupal prefieres:',
      answers: [
        { content: 'Cuidar del bienestar del equipo', careerId: medicine.id },
        { content: 'Diseñar la presentación visual', careerId: design.id },
        { content: 'Resolver los desafíos técnicos', careerId: engineering.id },
        {
          content: 'Llevar el control del presupuesto',
          careerId: accounting.id,
        },
      ],
    },
    {
      text: 'Tu entorno ideal de trabajo sería:',
      answers: [
        { content: 'Un hospital o clínica', careerId: medicine.id },
        { content: 'Un estudio de diseño', careerId: design.id },
        { content: 'Un laboratorio tecnológico', careerId: engineering.id },
        { content: 'Una oficina financiera', careerId: accounting.id },
      ],
    },
    {
      text: 'Qué tipo de libros prefieres:',
      answers: [
        { content: 'Sobre el cuerpo humano', careerId: medicine.id },
        { content: 'De arte o diseño', careerId: design.id },
        { content: 'De ciencia y tecnología', careerId: engineering.id },
        { content: 'De economía y negocios', careerId: accounting.id },
      ],
    },
    {
      text: 'Te gustaría trabajar con:',
      answers: [
        { content: 'Pacientes y personas necesitadas', careerId: medicine.id },
        { content: 'Colores y formas creativas', careerId: design.id },
        { content: 'Máquinas y sistemas complejos', careerId: engineering.id },
        {
          content: 'Datos financieros y estadísticas',
          careerId: accounting.id,
        },
      ],
    },
    {
      text: 'Tu mayor habilidad es:',
      answers: [
        { content: 'Cuidar de otros', careerId: medicine.id },
        { content: 'Expresarte artísticamente', careerId: design.id },
        { content: 'Pensamiento lógico-matemático', careerId: engineering.id },
        { content: 'Manejo preciso de números', careerId: accounting.id },
      ],
    },
    {
      text: 'Qué te parece más interesante:',
      answers: [
        { content: 'Descubrir una nueva medicina', careerId: medicine.id },
        { content: 'Crear una obra de arte innovadora', careerId: design.id },
        { content: 'Inventar una nueva tecnología', careerId: engineering.id },
        {
          content: 'Optimizar las finanzas de una empresa',
          careerId: accounting.id,
        },
      ],
    },
  ];

  for (const questionData of questionsData) {
    const question = await prisma.question.create({
      data: {
        text: questionData.text,
        answers: {
          create: questionData.answers,
        },
      },
    });
  }

  console.log('Seed completado exitosamente!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
