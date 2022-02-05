import React from "react";
import i18 from "../Config/i18n";

const Traduction = () =>{
    return (
        <div>
            <h1>Hello</h1>
                <a
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {i18.t('description.part1')}                </a>
        </div>
    )
}

export default Traduction;