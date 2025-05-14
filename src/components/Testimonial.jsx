import { FaQuoteLeft } from 'react-icons/fa';

function Testimonial({ quote, author, role }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <FaQuoteLeft className="text-brightBlue text-2xl mb-4" />
      <p className="text-gray-600 italic">"{quote}"</p>
      <div className="mt-4 flex items-center">
        <div className="w-12 h-12 bg-brightBlue rounded-full flex items-center justify-center text-white font-semibold text-lg">
          {author[0]}
        </div>
        <div className="ml-4">
          <p className="text-navy-900 font-medium">{author}</p>
          <p className="text-gray-500 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;