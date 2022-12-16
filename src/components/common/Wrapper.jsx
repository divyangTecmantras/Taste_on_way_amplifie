import React, { useState } from 'react';
import { createContext } from 'react';
import { IntlProvider } from 'react-intl';
import English from '../../Languages/en.json';
import Gujarati from '../../Languages/gj.json';
import Hindi from '../../Languages/hi.json';
import { flattenMessages, getItem, setItem } from '../../utils/utils';

export const Context = createContext();

let lang;
const langauge = getItem('langauge');
if (langauge === 'gj') {
    lang = Gujarati;
} else if (langauge === 'hi') {
    lang = Hindi;
} else {
    lang = English;
}

const Wrapper = (props) => {
    const [locale, setLocale] = useState(langauge);
    const [messages, setMessages] = useState(lang);

    function selectLang(e) {
        const newLocale = e.target.value;
        if (newLocale === 'gj') {
            setMessages(Gujarati);
            setItem('langauge', newLocale);
        } else if (newLocale === 'hi') {
            setMessages(Hindi);
            setItem('langauge', newLocale);
        } else {
            setMessages(English);
            setItem('langauge', newLocale);
        }
        setLocale(newLocale);
    }

    return (
        <>
            <Context.Provider value={{ locale, selectLang }}>
                <IntlProvider messages={flattenMessages(messages)} locale={locale}>
                    {props.children}
                </IntlProvider>
            </Context.Provider>
        </>
    );
};

export default Wrapper;
