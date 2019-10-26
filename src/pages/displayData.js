import React from 'react';

function DisplayData(props) {
    const { data } = props
    return (
        <table>
            <tbody>
                {
                    Object.keys(data).map((value,index) => {
                        return (typeof (data[value]) === "string" && typeof (data[value]) !== "url") &&
                            <tr key={index}>
                                <td>{value}</td>
                                <td>{data[value]}</td> 
                            </tr>
                    })
                }
            </tbody>
        </table>
    );
}

export default DisplayData;