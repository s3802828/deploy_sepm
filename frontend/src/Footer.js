export default function Footer() {
    return (
        <div className="py-3">
            <ul className='nav justify-content-center border-bottom pb-3 mb-3'>
                <li className='nav-item'>
                    <a href='/' className='nav-link px-2 text-muted'>
                        Home
                    </a>
                </li>
                <li className='nav-item'>
                    <a href='/#about' className='nav-link px-2 text-muted'>
                        About
                    </a>
                </li>
                <li className='nav-item'>
                    <a href='/client/cheatsheet/624bfee26f2c17b5768ef2a6' className='nav-link px-2 text-muted'>
                        Cheat Sheet
                    </a>
                </li>
                <li className='nav-item'>
                    <a href='/client/discussion/624bfee26f2c17b5768ef2a6/general' className='nav-link px-2 text-muted'>
                        Discussion
                    </a>
                </li>
                <li className='nav-item'>
                    <a href='#' className='nav-link px-2 text-muted'>
                        Back to top
                    </a>
                </li>
            </ul>
            <p className='text-center text-muted'>
                © 2022 RMIT University, CSFunction, Group 10
            </p>
        </div>
    );
}