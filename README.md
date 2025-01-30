# Communique

Communique is a social media web application that provides a responsive and user-friendly interface for users to interact, share posts, view recent activities, and stay updated with trending news.

## Features

- **Responsive Design**: The layout adapts seamlessly between desktop and mobile views, ensuring a great user experience on any device.
- **Dynamic Content**: Users can post updates, view recent activities, and see trending news, all dynamically fetched and displayed.
- **Sticky Sidebars**: Important information like user profiles and recent activities are always accessible thanks to sticky sidebars.
- **Theme Switching**: Users can switch between light, dark, and system-preferred themes for a personalized experience.
- **Infinite Scroll**: The main content area supports infinite scrolling, making it easy to browse through posts without interruptions.

## Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript**
- **Bootstrap 5**
- **Font Awesome**
- **Boxicons**
- **GNews API**
- **RandomUser API**
- **DummyJSON API**



## Getting Started





### Prerequisites

- Node.js and npm installed on your machine.
- A GNews API key. You can get one from [GNews](https://gnews.io/).

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/communique.git
   cd communique
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your GNews API key:
   ```env
   GNEWS_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```sh
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

- **Posting Updates**: Use the form in the main content area to post updates.
- **Viewing Recent Activities**: Check the "Recent Activity" section in the left sidebar.
- **People You May Know**: Find new connections in the right sidebar.
- **Trending News**: Stay updated with the latest news in the right sidebar.
- **Theme Switching**: Use the buttons in the navbar to switch between light, dark, and system-preferred themes.
- **Back to Top**: Use the "Back to Top" button to quickly scroll to the top of the page.

## Project Structure

```plaintext
communique/
├── public/
│   ├── index.html
│   ├── main.js
│   ├── styles.css
│   └── ... (other static assets)
├── src/
│   ├── components/
│   ├── services/
│   ├── App.js
│   ├── index.js
│   └── ... (other source files)
├── .env
├── package.json
├── README.md
└── vercel.json
```

## Deployment

This project is configured to be deployed on Vercel. To deploy:

1. Install Vercel CLI:
   ```sh
   npm install -g vercel
   ```

2. Login to Vercel:
   ```sh
   vercel login
   ```

3. Deploy the project:
   ```sh
   vercel
   ```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## Acknowledgements

- [GNews API](https://gnews.io/)
- [RandomUser API](https://randomuser.me/)
- [DummyJSON API](https://dummyjson.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Font Awesome](https://fontawesome.com/)
- [Boxicons](https://boxicons.com/)

---
