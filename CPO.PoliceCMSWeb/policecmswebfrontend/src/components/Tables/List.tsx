import { useNavigate } from 'react-router-dom';

interface TableProps {
  data: any[];
  headers: { key: string; label: string }[];
  actions?: {
    label: string;
    actionType: 'edit' | 'delete' | 'view' | 'custom';
    navigateUrl?: (id: any) => string; // Function to generate the URL based on the object ID
    callback?: (id: any) => void;      // Callback for delete or other non-navigation actions
  }[];
}

const DynamicList: React.FC<TableProps> = ({ data, headers, actions }) => {
  const navigate = useNavigate();

  const handleAction = (actionType: string, id: any) => {
    const action = actions?.find(a => a.actionType === actionType);

    if (action) {
      if (action.navigateUrl) {
        const url = action.navigateUrl(id);
        navigate(url); // Navigate to the generated URL
      } else if (action.callback) {
        action.callback(id); // Trigger the callback function
      }
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white"
                >
                  {header.label}
                </th>
              ))}
              {actions && (
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header, colIndex) => (
                  <td
                    key={colIndex}
                    className="border-b border-[#eee] py-5 px-4 dark:border-strokedark"
                  >
                    <h5 className="font-medium text-black dark:text-white">
                      {item[header.key]}
                    </h5>
                  </td>
                ))}

                {actions && (
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      {actions.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          className="hover:text-primary"
                          onClick={() => handleAction(action.actionType, item.id)}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DynamicList;
