interface Props {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: Props) => {
  return (
    <div className={`${className} mx-auto max-w-screen-xl px-4 py-10 xl:px-0`}>
      {children}
    </div>
  );
};

export default Container;
