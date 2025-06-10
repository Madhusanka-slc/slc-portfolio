import React from 'react';

const BlogDefectDetectionInfo = () => {
    return (
        <div className="text-gray-400 space-y-6">
            <div>
                <h4 className="text-lg text-gray-300 font-semibold">Overview</h4>
                <p>
                    This blog post explores how to implement real-time defect detection systems using computer vision. It focuses on automating quality control processes in manufacturing environments.
                </p>
            </div>

            <div>
                <h4 className="text-lg text-gray-300 font-semibold">Technical Focus</h4>
                <ul className="list-disc list-inside">
                    <li>Training object detection models like YOLOv8</li>
                    <li>Real-time inference and edge deployment</li>
                    <li>Integration with mechanical systems</li>
                </ul>
            </div>

            <div>
                <h4 className="text-lg text-gray-300 font-semibold">Impact</h4>
                <p>
                    Enhances product quality, reduces manual inspection effort, and improves manufacturing efficiency with AI-powered visual inspection systems.
                </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
                {['YOLOv8', 'Computer Vision', 'Edge AI', 'Manufacturing', 'Defect Detection'].map((tag) => (
                    <span key={tag} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default BlogDefectDetectionInfo;
