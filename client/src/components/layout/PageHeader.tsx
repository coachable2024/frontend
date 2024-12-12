interface PageHeaderProps {
    title: string;
    children?: React.ReactNode;
  }
  
  export function PageHeader({ title, children }: PageHeaderProps) {
    return (
      <div className="flex items-center justify-between mb-1 px-1 py-1">
        {children && (
          <div className="flex items-center gap-2">
            {children}
          </div>
        )}
     </div>
    );
  }
  