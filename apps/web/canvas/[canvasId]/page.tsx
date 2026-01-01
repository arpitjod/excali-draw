export default function CanvasPage({
    params
}: {
    params: {
        canvasId: string
    }
}) {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Canvas Drawing Board
                </h1>
                <div className="text-gray-600 mb-6">
                    <p>Canvas ID: <span className="font-semibold text-blue-600">{params.canvasId}</span></p>
                </div>
                <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
                    <p className="text-gray-500 text-center">
                        Canvas drawing area - Feature coming soon!
                    </p>
                    <div className="mt-4 h-64 bg-white border border-gray-200 rounded flex items-center justify-center">
                        <p className="text-gray-400">Drawing canvas will appear here</p>
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2">
                        Start Drawing
                    </button>
                    <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
                        Save Canvas
                    </button>
                </div>
            </div>
        </div>
    );
}
