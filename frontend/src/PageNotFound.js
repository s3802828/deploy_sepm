import weblogo from "./assets/weblogo.jpg";

export default function PageNotFound() {
    return (
        <div style={{ marginTop: "150px", marginBottom: 80 }}>
            <div class="d-flex align-items-center h-100">
                <div class="container-fluid">
                    <div class="row justify-content-center">
                        <div class="col-xl-4 col-lg-6 col-sm-8 col-10">
                            <div style={{ marginLeft: '35%' }}>
                                <img
                                    className='mb-4 mx-auto'
                                    src={weblogo}
                                    alt='Web Logo'
                                    width='45%'
                                    height='45%'
                                />
                            </div>
                            <h2 class="mb-3 mt-10 text-center text-white">404</h2>
                            <h2 class="mb-3 mt-10 text-center text-white">PAGE NOT FOUND</h2>
                            <button type="button" class="btn btn-warning w-100"><a href="/" class="link-light" style={{textDecoration: "none" }}>Back to Home Page</a></button>
                            
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}