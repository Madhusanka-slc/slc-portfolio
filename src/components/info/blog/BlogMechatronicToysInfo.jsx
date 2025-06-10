import React from 'react';

const BlogMechatronicToysInfo = () => {
    return (
        <div className="text-gray-400 space-y-6">
            <div>
                <h4 className="text-lg text-gray-300 font-semibold">Overview</h4>
                <p>
                    This blog dives into how to design interactive mechatronic toys that blend mechanical engineering principles with AI and embedded systems.
                </p>
            </div>

            <div>
                <h4 className="text-lg text-gray-300 font-semibold">Technical Focus</h4>
                <ul className="list-disc list-inside">
                    <li>Using microcontrollers like Arduino or ESP32</li>
                    <li>Integrating sensors for motion and gesture recognition</li>
                    <li>AI model deployment on embedded hardware</li>
                </ul>
            </div>

            <div>
                <h4 className="text-lg text-gray-300 font-semibold">Impact</h4>
                <p>
                    Encourages STEM learning and provides a creative outlet for developing smart, engaging, and educational mechanical toys.
                </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
                {['Mechatronics', 'Embedded AI', 'Arduino', 'Gesture Recognition', 'STEM Toys'].map((tag) => (
                    <span key={tag} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default BlogMechatronicToysInfo;
