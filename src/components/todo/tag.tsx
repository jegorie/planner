type Props = {
  title: string;
};

export const Tag: React.FC<Props> = (props) => {
  const { title } = props;

  return <div className="text-xs border rounded py-1 px-2">{title}</div>;
};
