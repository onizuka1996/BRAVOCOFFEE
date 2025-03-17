import requests
import os

# Create images directory if it doesn't exist
if not os.path.exists('images'):
    os.makedirs('images')

# Coffee image URLs
coffee_images = {
    'espresso.jpg': 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=500&auto=format&fit=crop&q=60',
    'americano.jpg': 'https://images.unsplash.com/photo-1581996323407-47d3f92312cc?w=500&auto=format&fit=crop&q=60',
    'latte.jpg': 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=500&auto=format&fit=crop&q=60',
    'cappuccino.jpg': 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=500&auto=format&fit=crop&q=60',
    'mocha.jpg': 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=500&auto=format&fit=crop&q=60',
    'iced-americano.jpg': 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&auto=format&fit=crop&q=60',
    'iced-latte.jpg': 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&auto=format&fit=crop&q=60',
    'iced-mocha.jpg': 'https://images.unsplash.com/photo-1572286258217-215cf8e939f7?w=500&auto=format&fit=crop&q=60',
    'iced-caramel-macchiato.jpg': 'https://images.unsplash.com/photo-1592321675774-3de57f3ee0dc?w=500&auto=format&fit=crop&q=60',
    'coffee-frappe.jpg': 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=500&auto=format&fit=crop&q=60',
    'mocha-frappe.jpg': 'https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?w=500&auto=format&fit=crop&q=60',
    'caramel-frappe.jpg': 'https://images.unsplash.com/photo-1586195831800-24f14c992cea?w=500&auto=format&fit=crop&q=60',
    'about-coffee.jpg': 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&auto=format&fit=crop&q=60',
    'hero-bg.jpg': 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500&auto=format&fit=crop&q=60'
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

print("All images downloaded!")
