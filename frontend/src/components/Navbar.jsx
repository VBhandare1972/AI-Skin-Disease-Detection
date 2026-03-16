import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-[#088395] text-white px-8 py-4 flex justify-between items-center shadow-lg">

      <h1 className="text-xl font-bold tracking-wide">
        SkinAI
      </h1>

      <div className="flex gap-8 text-sm font-medium">

        <Link to="/" className="hover:text-[#EBF4F6]">
          Home
        </Link>

        <Link to="/predict" className="hover:text-[#EBF4F6]">
          Prediction
        </Link>

        <Link to="/hospital" className="hover:text-[#EBF4F6]">
          Hospitals
        </Link>

        <Link to="/feedback" className="hover:text-[#EBF4F6]">
          Feedback
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;