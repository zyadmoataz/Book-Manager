import Header from "./components/layout/Header";
import BookCard from "./components/ui/BookCard";

function App() {
  return (
    <div>
      <Header />
      <BookCard
        book={{
          id: 1,
          title: "The Pragmatic Programmer",
          author: "Hunt & Thomas",
          year: 1999,
          genre: "tech",
          read: true,
          cover:
            "https://www.magnific.com/free-photos-vectors/testimonial-headshot",
        }}
      />
    </div>
  );
}

export default App;
