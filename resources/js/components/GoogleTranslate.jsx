import React, { useEffect } from "react";

const GoogleTranslate = () => {
    useEffect(() => {
        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: "en",
                    includedLanguages: "en,es",
                    autoDisplay: false,
                },
                "google_translate_element"
            );
        };

        const addScript = document.createElement("script");
        addScript.setAttribute("src", "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit");
        document.body.appendChild(addScript);
    }, []);

    // Función para cambiar el idioma manualmente
    const changeLanguage = (langCode) => {
        const select = document.querySelector(".goog-te-combo");
        if (select) {
            select.value = langCode;
            select.dispatchEvent(new Event("change"));
        }
    };

    return (
        <div className="language-switcher">
            {/* El widget real de Google estará oculto por CSS */}
            <div id="google_translate_element" style={{ display: 'none' }}></div>
            
            {/* Tus botones personalizados */}
            <button onClick={() => changeLanguage('en')} className="btn-lang">EN</button>
            <span className="text-muted mx-1">|</span>
            <button onClick={() => changeLanguage('es')} className="btn-lang">ES</button>
        </div>
    );
};

export default GoogleTranslate;