import requests
import os

# Create images directory if it doesn't exist
if not os.path.exists('images'):
    os.makedirs('images')

# Coffee image URLs for missing images
coffee_images = {
    'americano.jpg': 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=60',
    'iced-mocha.jpg': 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&auto=format&fit=crop&q=60'
}

# Download each image
for filename, url in coffee_images.items():
    print(f"Downloading {filename}...")
    response = requests.get(url, stream=True)
    if response.status_code == 200:
        with open(f'images/{filename}', 'wb') as f:
            for chunk in response.iter_content(1024):
                f.write(chunk)
        print(f"Downloaded {filename} successfully")
    else:
        print(f"Failed to download {filename}")

print("All missing images downloaded!")
