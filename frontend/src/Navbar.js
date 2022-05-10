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
                    <a class="navbar-brand" href="#" style={{ color: '#fda47e' }}>CSFunction</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav" >
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/" style={{ color: '#fda47e' }}>Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/#about" style={{ color: '#fda47e' }}>About</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" aria-current="page" href="/cheatsheet/624bfee26f2c17b5768ef2a6" style={{ color: '#fda47e' }}>Cheat Sheet</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/discussion/624bfee26f2c17b5768ef2a6/general" style={{ color: '#fda47e' }}>Discussion</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/#contact" style={{ color: '#fda47e' }}>Contact</a>
                            </li>
                        </ul>

                        {role ? <ul class="nav navbar-nav ms-auto"> <div className="dropdown">
                            <a href="#" class="d-flex align-items-center justify-content-center link-dark text-decoration-none dropdown-toggle p-1 rounded-pill" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false" role="button" style={{ backgroundColor: '#fda47e' }}>
                                <img src={`${authData?.avatar ? `https://csfunctions-web-app.s3.amazonaws.com/${authData?.avatar}` : 'http://cdn.onlinewebfonts.com/svg/img_24787.png'} `} alt="" width="32" height="32" class="rounded-circle me-2" />

                                <strong>{authData?.username}</strong>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownUser2" data-popper-placement="top-end">

                                {/* <li><a class="dropdown-item" href="/addadmin">Add New Admin</a></li> */}
                                {role.map((element) => element == 'admin' && <li><a class="dropdown-item" href="/addadmin">Add Admin</a></li>)}
                                <li><a class="dropdown-item" href={`/profile/${authData?._id}`}>Profile</a></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><a class="dropdown-item" href="/" onClick={() => dispatch(logout())}>Sign out</a></li>
                            </ul>
                        </div> </ul> : <ul class="nav navbar-nav ms-auto"><li class="nav-item">
                            <a class="nav-link" href="/signup" style={{ color: '#fda47e' }}>Sign Up</a>
                        </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/login" style={{ color: '#fda47e' }}>Login</a>
                            </li></ul>}
                    </div>
                </div>
            </nav>

        </div>
    )
}