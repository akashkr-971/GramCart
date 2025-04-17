export default function Testimonials() {
  const testimonials = [
    {
      name: 'Ramesh',
      feedback: 'GramCart has made my life so much easier. I can now get all my farming tools delivered to my doorstep!',
    },
    {
      name: 'Sita',
      feedback: 'The quality of products is amazing, and the prices are very reasonable. Highly recommend GramCart!',
    },
    {
      name: 'Arjun',
      feedback: 'I love the variety of items available. It truly caters to the needs of rural areas.',
    },
  ];

  return (
    <div className="space-y-4">
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-600"
        >
          <p className="text-gray-700 italic">"{testimonial.feedback}"</p>
          <h4 className="text-green-800 font-bold mt-2">- {testimonial.name}</h4>
        </div>
      ))}
    </div>
  );
}