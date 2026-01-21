import React from 'react'

const LoadingSkeleton = ({ isDark }) => (
    <div className="min-h-screen py-20 px-4 max-w-4xl mx-auto">
        <div className="animate-pulse space-y-8">
            {/* Back button skeleton */}
            <div className={`h-6 w-32 rounded ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />

            {/* Title skeleton */}
            <div className="space-y-3">
                <div className={`h-12 w-full rounded ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
                <div className={`h-12 w-3/4 rounded ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
            </div>

            {/* Meta info skeleton */}
            <div className="flex gap-4">
                <div className={`h-10 w-32 rounded-full ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
                <div className={`h-10 w-32 rounded-full ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
                <div className={`h-10 w-32 rounded-full ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
            </div>

            {/* Image skeleton */}
            <div className={`h-96 w-full rounded-md ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />

            {/* Content skeleton */}
            <div className="space-y-4">
                <div className={`h-4 w-full rounded ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
                <div className={`h-4 w-full rounded ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
                <div className={`h-4 w-5/6 rounded ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
            </div>
        </div>
    </div>
);

export default LoadingSkeleton