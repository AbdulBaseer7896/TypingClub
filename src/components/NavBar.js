import { Link } from "react-router-dom";

// Link
const Navbar = () => {

    return (
            <nav className='bg-[#0d1110] shadow-md '>
                <div className='container mx-auto px-3 md:px-16 lg:px-24 py-5 flex justify-between items-center'>
                    {/* Logo on the left */}
                    <div className='text-lg font-bold text-[#c59438]'>
                        <Link to='/'>Moiz-Typing</Link>
                    </div>

                    {/* Navigation links centered */}
                    <div className='flex-grow flex justify-center'>
                        <div className='flex items-center space-x-10 text-sm font-bold text-[#c59438]'>
                            <Link to={"/"} className='hover:underline'>Home</Link>
                            <Link to={"/Ranking"} className='hover:underline'>Ranking</Link>
                            <Link to={"/"} className='hover:underline'>Contact</Link>
                            <Link to={"/"} className='hover:underline'>About</Link>
                            <Link to={"/"} className='hover:underline'>Logout</Link>
                        </div>
                    </div>
                </div>
                <hr className="bg-[#555555] border-0 h-1"/>
            </nav>
    );
};

export default Navbar;