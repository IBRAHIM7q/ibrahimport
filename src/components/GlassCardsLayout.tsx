'use client';

import React from 'react';
import { Code, Palette, TrendingUp } from 'lucide-react';
import GlassSurface from './ui/GlassSurface';

const config = {
  "layout": {
    "container": {
      "className": "min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-black flex items-center justify-center p-8",
      "gap": "gap-6"
    },
    "grid": {
      "className": "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full"
    }
  },
  "cards": [
    {
      "id": "clean-code",
      "glassSurface": {
        "width": 300,
        "height": 400,
        "borderRadius": 20,
        "brightness": 45,
        "opacity": 0.9,
        "blur": 12,
        "backgroundOpacity": 0.1,
        "saturation": 1.2,
        "className": "hover:scale-105 transition-transform duration-300"
      },
      "content": {
        "icon": {
          "type": "code",
          "color": "bg-green-500",
          "size": "w-16 h-16",
          "className": "rounded-2xl flex items-center justify-center mb-6"
        },
        "title": {
          "text": "Clean Code",
          "className": "text-2xl font-bold text-white mb-4 text-center"
        },
        "description": {
          "text": "Writing maintainable, scalable code with best practices and modern development methodologies.",
          "className": "text-gray-300 text-center leading-relaxed px-4"
        }
      }
    },
    {
      "id": "ui-design",
      "glassSurface": {
        "width": 300,
        "height": 400,
        "borderRadius": 20,
        "brightness": 45,
        "opacity": 0.9,
        "blur": 12,
        "backgroundOpacity": 0.1,
        "saturation": 1.2,
        "className": "hover:scale-105 transition-transform duration-300"
      },
      "content": {
        "icon": {
          "type": "palette",
          "color": "bg-purple-500",
          "size": "w-16 h-16",
          "className": "rounded-2xl flex items-center justify-center mb-6"
        },
        "title": {
          "text": "UI Design",
          "className": "text-2xl font-bold text-white mb-4 text-center"
        },
        "description": {
          "text": "Creating intuitive, beautiful interfaces that provide exceptional user experiences.",
          "className": "text-gray-300 text-center leading-relaxed px-4"
        }
      }
    },
    {
      "id": "performance",
      "glassSurface": {
        "width": 300,
        "height": 400,
        "borderRadius": 20,
        "brightness": 45,
        "opacity": 0.9,
        "blur": 12,
        "backgroundOpacity": 0.1,
        "saturation": 1.2,
        "className": "hover:scale-105 transition-transform duration-300"
      },
      "content": {
        "icon": {
          "type": "trending-up",
          "color": "bg-green-500",
          "size": "w-16 h-16",
          "className": "rounded-2xl flex items-center justify-center mb-6"
        },
        "title": {
          "text": "Performance",
          "className": "text-2xl font-bold text-white mb-4 text-center"
        },
        "description": {
          "text": "Optimizing for speed, efficiency, and scalability to deliver the best possible performance.",
          "className": "text-gray-300 text-center leading-relaxed px-4"
        }
      }
    }
  ]
};

const IconComponent = ({ type, className }: { type: string; className?: string }) => {
  const icons = {
    code: Code,
    palette: Palette,
    'trending-up': TrendingUp
  };
  
  const Icon = icons[type as keyof typeof icons];
  return <Icon className={`${className} text-white`} />;
};

const GlassCardsLayout = () => {
  return (
    <div className={config.layout.container.className}>
      <div className={config.layout.grid.className}>
        {config.cards.map((card, index) => (
          <GlassSurface
            key={card.id}
            {...card.glassSurface}
            style={{
              animationDelay: `${index * 200}ms`
            }}
          >
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <div className={`${card.content.icon.color} ${card.content.icon.size} ${card.content.icon.className}`}>
                <IconComponent 
                  type={card.content.icon.type} 
                  className="w-8 h-8"
                />
              </div>
              
              <h3 className={card.content.title.className}>
                {card.content.title.text}
              </h3>
              
              <p className={card.content.description.className}>
                {card.content.description.text}
              </p>
            </div>
          </GlassSurface>
        ))}
      </div>
    </div>
  );
};

export default GlassCardsLayout;