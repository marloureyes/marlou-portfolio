type WorkItem = {
  name: string;
  type: string;
  title: string;
  link: string;
  demoLink?: string;
  image: {
    imageUrl: string;
    altText: string;
  };
  isSelected?: boolean;
};
