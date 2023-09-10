import Box from "@/components/Box";
import Icon from "@/components/Icon";

type FileRowProps = {
  visible: boolean;
  file: {
    name: string;
    type: string;
  };
};

const files = [
  {
    file: {
      name: "Resume",
      type: "pdf",
    },
    visible: true,
  },
  {
    file: {
      name: "Cover Letter",
      type: "pdf",
    },
    visible: true,
  },
  {
    file: {
      name: "Transcript",
      type: "pdf",
    },
    visible: true,
  },
];

export default function Files() {
  return (
    <Box className='flex flex-col gap-y-5 p-8'>
      <p className='text-xl font-bold'>Files</p>
      <table className='text-left table-auto w-full'>
        <thead className='border-b-2 border-slate-200'>
          <tr className='text-sm font-bold text-slate-800'>
            <th className='px-6 py-3'>Name</th>
            <th className='px-6 py-3'>Type</th>
            <th className='px-6 py-3'>Visible</th>
            <th className='px-6 py-3'></th>
            <th className='px-6 py-3'></th>
            <th className='px-6 py-3'></th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <FileRow key={index} visible={file.visible} file={file.file} />
          ))}
        </tbody>
      </table>
    </Box>
  );
}

function FileRow({ visible, file }: FileRowProps) {
  // const dataUrl = convertBase64StringToDataUrl(file.type, file.file);
  return (
    <>
      <tr>
        <td className='px-6 py-3'>{file.name}</td>
        <td className='px-6 py-3'>{file.type}</td>
        <td className='px-6 py-3'>{visible ? "Public" : "Private"}</td>
        <td className='px-6 py-3'>
          <p className='border-0 bg-none text-sky-400 text-sm font-semibold'>
            View
          </p>
        </td>
        <td className='px-6 py-3'>
          <Icon name='Download' />
        </td>
      </tr>
      {/* <Modal open={open} close={() => setOpen(false)}>
        <Box className='w-[850px]'>
          {file.type.slice(0, 5) === "image" ? (
            <img src={dataUrl} alt={"File"} />
          ) : (
            <iframe src={dataUrl} />
          )}
        </Box>
      </Modal> */}
    </>
  );
}
