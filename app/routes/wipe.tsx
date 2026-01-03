import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "~/components/Navbar";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
  const { auth, isLoading, error, fs, kv } = usePuterStore();
  const navigate = useNavigate();

  const [files, setFiles] = useState<FSItem[]>([]);
  const [isWiping, setIsWiping] = useState(false);

  const loadFiles = async () => {
    const files = (await fs.readDir("./")) as FSItem[];
    setFiles(files);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/wipe");
    }
  }, [isLoading, auth.isAuthenticated, navigate]);

  const handleDelete = async () => {
    setIsWiping(true);
    try {
      for (const file of files) {
        await fs.delete(file.path);
      }
      await kv.flush();
      await loadFiles();
    } finally {
      setIsWiping(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen items-center justify-center text-gray-500">
          Loading application…
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen items-center justify-center text-red-500">
          Error: {error}
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="main-section">
        <div className="w-full max-w-3xl rounded-2xl bg-white shadow-sm border border-gray-200">

          {/* Header */}
          <div className="border-b px-6 py-4">
            <h2>Clear Resume Data</h2>
            <p className="text-sm text-gray-500">
              Logged in as <span className="font-medium">{auth.user?.username}</span>
            </p>
          </div>

          {/* Files Section */}
          <div className="px-6 py-4">
            <h3 className="mb-3 text-sm font-medium text-dark-200">
              Existing Files
            </h3>

            {files.length === 0 ? (
              <div className="rounded-2xl border border-dashed p-6 text-center text-sm text-gray-500">
                No files found. Your app storage is clean.
              </div>
            ) : (
              <div className="max-h-64 overflow-y-auto rounded-2xl border">
                <ul className="divide-y">
                  {files.map((file) => (
                    <li
                      key={file.id}
                      className="flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50"
                    >
                      <span className="text-gray-800">{file.name}</span>
                      <span className="text-xs text-gray-400 truncate max-w-[40%]">
                        {file.path}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Danger Zone */}
          <div className="border-t bg-badge-red px-6 py-4 rounded-b-2xl">
            <h3 className="text-sm font-semibold text-badge-red-text">
              Danger Zone
            </h3>
            <p className="mt-1 text-sm text-badge-red-text/80">
              This action permanently deletes all resume files and stored data.
            </p>

            <div className="mt-4">
              <button
                onClick={handleDelete}
                disabled={isWiping || files.length === 0}
                className="
                  primary-button
                  primary-button-inline
                  text-sm font-semibold
                  transition-all duration-300
                  hover:primary-gradient-hover
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                {isWiping ? "Wiping data…" : "Wipe App Data"}
              </button>
            </div>
          </div>

        </div>
      </main>
    </>
  );
};

export default WipeApp;
