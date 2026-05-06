import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Alen's Barbershop</h3>
                    <p>Profesionalne usluge šišanja i brijanja</p>
                </div>
                <div className="footer-section">
                    <h4>Kontakt</h4>
                    <p>📞 +387 61 234 567</p>
                    <p>📧 info@alensbarbershop.ba</p>
                    <p>📍 Sarajevo, BiH</p>
                </div>
                <div className="footer-section">
                    <h4>Radno vrijeme</h4>
                    <p>Pon - Pet: 09:00 - 20:00</p>
                    <p>Subota: 09:00 - 17:00</p>
                    <p>Nedjelja: Zatvoreno</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 Alen's Barbershop. Sva prava zadržana.</p>
            </div>
        </footer>
    );
}

export default Footer;