import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Certificate = () => {
    const { id } = useParams();
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const fetchAdminDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/user-details/${id}`);
                const data = await response.json();
                setAdmin(data);
            } catch (error) {
                console.error("Error fetching admin details:", error);
            }
        };
        fetchAdminDetails();
    }, [id]);

    if (!admin) return <div className="text-center text-lg">Loading...</div>;

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-2 relative overflow-hidden">
            

            {/* Certificate Container */}
            <div className="relative w-full max-w-7xl bg-black rounded-xl shadow-lg border-4 border-gold-500 p-1 text-center text-white">

                {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold opacity-5 select-none"><img className=" h-80 w-80" src="/trustBrand01.png"  alt="" /></span>
            </div>
                
                {/* Corner Images */}
                <img 
                    src="/border2.png" 
                    className="absolute top-2 left-2 w-32 h-32 opacity-80"
                    alt="decoration"
                />
                <img 
                    src="/border2.png" 
                    className="absolute rotate-90 top-2 right-2 w-32 h-32 opacity-80 transform scaleX(-1)"
                    alt="decoration"
                />
                
                {/* Header */}
                <div className="mb-10 relative z-10">
                    <div className="text-5xl font-bold text-gold-500 mt-5">CERTIFICATE</div>
                    <div className="text-xl mt-2 tracking-widest">OF ACHIEVEMENT</div>
                    <div className="h-1 bg-yellow-500 w-36 mx-auto mt-4"></div>
                </div>

                {/* Recipient Section */}
                <p className="text-lg text-gray-300">This certificate is proudly presented to</p>
                <h1 className="text-4xl font-bold text-gold-500 mt-4 mb-6">{admin.fullName}</h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                    For outstanding performance and dedication. This award is presented in recognition
                    of their exceptional contributions.
                </p>
                <span className="block text-3xl text-gold-500 mt-4 font-semibold">Samadhan Group</span>

                {/* Gold Decoration */}
                <div className="mt-10 flex justify-center">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-xl font-semibold text-black"><img src="/awardImg.png" alt="" className="w-20 h-20" /></span>
                    </div>
                </div>

                {/* Signature Section */}
                <div className="mt-12 grid grid-cols-2 gap-8 items-end text-gray-300">
                    <div className="text-left">
                        <div className="text-sm">Date of Issue</div>
                        <div className="h-0.5 bg-yellow-500 w-32 mb-2"></div>
                        <div className="text-lg">{new Date().toLocaleDateString()}</div>
                    </div>

                    <div className="text-right">
                        <div className="text-sm">Authorized Signature</div>
                        <div className="h-0.5 bg-yellow-500 w-32 ml-auto mb-2"></div>
                        <div className="text-lg">Chairman, Excellence Group</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Certificate;
