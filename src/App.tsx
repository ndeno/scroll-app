import * as React from "react";
import "./App.css";

const MAX_PAGES = 100;

type Item = {
  count: number;
  color: string;
};

type ItemProps = {
  children: React.ReactNode;
  color: string;
  reference?: (node: Element) => void;
};

const generateRandomColor = () => {
  const characters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += characters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Item = ({ children, color, reference }: ItemProps) => {
  return (
    <div
      className="item"
      style={{ backgroundColor: color }}
      ref={reference as React.LegacyRef<HTMLDivElement>} // fix cast
    >
      {children}
    </div>
  );
};

const App = () => {
  const [items, setItems] = React.useState<Item[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [pages, setPages] = React.useState(0);
  const observer = React.useRef<IntersectionObserver>();

  React.useEffect(() => {
    updateItems();
    setPages((pages) => pages + 1);
  }, []);

  const lastItemRef = React.useCallback(
    (node: Element) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          if (pages < MAX_PAGES) {
            updateItems();
            setPages((pages) => pages + 1);
          } else {
            setHasMore(false);
          }
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const updateItems = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setItems((currItems) => {
      const lastItem = currItems.length;
      const updatedItems = [...currItems];
      for (let i = 1; i <= 5; i++) {
        const item = {
          count: lastItem + i,
          color: generateRandomColor(),
        };
        updatedItems.push(item);
      }
      return updatedItems;
    });

    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <h1>Infinite Scroll Demo</h1>
      {items.map((item, index) =>
        index + 1 === items.length ? (
          <Item reference={lastItemRef} key={index} color={item.color}>
            {item.count}
          </Item>
        ) : (
          <Item key={index} color={item.color}>
            {item.count}
          </Item>
        )
      )}
      {isLoading && <div className="loader" />}
    </React.Fragment>
  );
};

export default App;
