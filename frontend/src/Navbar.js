import 'bootstrap/js/dist/carousel'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './redux_sepm/actions/user';
export default function Navbar() {
    const {authData, role} = useSelector((state) => state?.authReducer)
    const dispatch = useDispatch()
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style={{ backgroundColor: '#3d3737', position: "absolute", top: 0, zIndex: 100, width: "100%" }}>
                <div class="container-fluid">
                    <a class="navbar-brand" href="/" style={{ color: '#d64612' }}>CSFunction</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav" >
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/" style={{ color: '#ffc13b' }}>Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/#about" style={{ color: '#ffc13b' }}>About</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" aria-current="page" href="/client/cheatsheet/624bfee26f2c17b5768ef2a6" style={{ color: '#ffc13b' }}>Cheat Sheet</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/client/discussion/624bfee26f2c17b5768ef2a6/general" style={{ color: '#ffc13b' }}>Discussion</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/#contact" style={{ color: '#ffc13b' }}>Contact</a>
                            </li>
                        </ul>

                        {role ? <ul class="nav navbar-nav ms-auto"> <div className="dropdown">
                            <a href="#" class="d-flex align-items-center justify-content-center link-dark text-decoration-none dropdown-toggle p-1 rounded-pill" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false" role="button" style={{ backgroundColor: '#ffc13b' }}>
                                <img src={`${authData?.avatar ? `https://csfunctions-web-app.s3.amazonaws.com/${authData?.avatar}` : 'http://cdn.onlinewebfonts.com/svg/img_24787.png'} `} alt="" width="32" height="32" class="rounded-circle me-2" />

                                <strong>{authData?.username}</strong>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownUser2" data-popper-placement="top-end">

                               
                                {role && role?.includes('admin') && <li><a class="dropdown-item" href="/client/addadmin">Add Admin</a></li>}
                                <li><a class="dropdown-item" href={`/client/profile/${authData?._id}`}>Profile</a></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><a class="dropdown-item" href="/" onClick={() => dispatch(logout())}>Sign out</a></li>
                            </ul>
                        </div> </ul> : <ul class="nav navbar-nav ms-auto"><li class="nav-item">
                            <a class="nav-link" href="/client/signup" style={{ color: '#ffc13b' }}>Sign Up</a>
                        </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/client/login" style={{ color: '#ffc13b' }}>Login</a>
                            </li></ul>}
                    </div>
                </div>
            </nav>

        </div>
    )
}