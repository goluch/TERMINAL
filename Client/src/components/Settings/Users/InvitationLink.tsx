import {Button, Transition} from "@headlessui/react";
import {useState} from "react";
import {ClipboardIcon} from "@heroicons/react/16/solid";

interface  InvitationLinkProps{
    link: string,
}

const InvitationLink = (props: InvitationLinkProps) => {

    const [open, setOpen] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(props.link).then(() => {});
    }

    return (
        <>
        <div className="w-full flex justify-center">
            <Button className="btn m-1" onClick={() => setOpen((open) => !open)}>Show Link</Button>
            <Button className="btn m-1" onClick={handleCopy}>
                <ClipboardIcon className="h-4 w-4 mt-0.5"/>
                Copy
            </Button>
        </div>
            <Transition show={open}>
                <div className="transition duration-300 ease-in data-[closed]:opacity-0 link text-center">
                    {props.link}
                </div>
            </Transition>
        </>
    );
};

export default InvitationLink;