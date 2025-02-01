
interface  InvitationLinkProps{
    link: string,

}

const InvitationLink = (props: InvitationLinkProps) => {
    return (
        <div>
            {props.link}
        </div>
    );
};

export default InvitationLink;