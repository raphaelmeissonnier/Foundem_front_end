import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';
import i18n from '../../Translation/i18n';


const Footer = () => {
    return (
        <MDBFooter className='text-center text-lg-start text-muted' style={{ backgroundColor:"#CEDDF6", bottom:0, position:"relative" }}>
            <section className=''>
                <div className='p-4 pb-0'>
                    <div className='row'>
                        <div className='col-md-6 col-lg-6 col-xl-6 mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>
                                <i className='fas fa-gem me-3'/>Found'em
                            </h6>
                            <p className='d-flex justify-content-center align-items-center'>
                                {i18n.t('footer.description')}
                            </p>
                        </div>

                        <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>{i18n.t('footer.links')}</h6>
                            <p>
                                <a href='/Login' className='text-reset'>
                                    {i18n.t('footer.yourAccount')}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className='text-center p-3' style={{ backgroundColor: "#bcd2f7" }}>
                © 2022 Copyright:
                <a className='text-reset fw-bold' href="https://raphaelmeissonnier.github.io/Foundem_back_end/">
                    Found'em
                </a>
            </div>
        </MDBFooter>
    );
}


export default Footer;