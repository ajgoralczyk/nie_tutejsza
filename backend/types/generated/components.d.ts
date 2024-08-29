import type { Schema, Attribute } from '@strapi/strapi';

export interface ComponentsCarousel extends Schema.Component {
  collectionName: 'components_components_carousels';
  info: {
    displayName: 'Carousel';
  };
  attributes: {
    files: Attribute.Media<'images', true>;
  };
}

export interface ComponentsIconLink extends Schema.Component {
  collectionName: 'components_components_icon_links';
  info: {
    displayName: 'IconLink';
  };
  attributes: {
    icon: Attribute.String & Attribute.Required;
    url: Attribute.String;
  };
}

export interface ComponentsLink extends Schema.Component {
  collectionName: 'components_components_links';
  info: {
    displayName: 'Link';
    description: '';
  };
  attributes: {
    text: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
  };
}

export interface ComponentsQuote extends Schema.Component {
  collectionName: 'components_components_quotes';
  info: {
    displayName: 'Quote';
  };
  attributes: {
    body: Attribute.Text & Attribute.Required;
    author: Attribute.String;
  };
}

export interface ComponentsRichText extends Schema.Component {
  collectionName: 'components_components_rich_texts';
  info: {
    displayName: 'Rich text';
  };
  attributes: {
    body: Attribute.RichText & Attribute.Required;
  };
}

export interface ComponentsTextWithImage extends Schema.Component {
  collectionName: 'components_components_text_with_images';
  info: {
    displayName: 'TextWithImage';
  };
  attributes: {
    text: Attribute.RichText;
    image: Attribute.Media<'images'>;
    type: Attribute.Enumeration<['ImageLeft', 'ImageRight']>;
  };
}

export interface LayoutAboutMe extends Schema.Component {
  collectionName: 'components_layout_about_mes';
  info: {
    displayName: 'aboutMe';
  };
  attributes: {
    description: Attribute.Text;
    image: Attribute.Media<'images'>;
  };
}

export interface LayoutFooter extends Schema.Component {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    links: Attribute.Component<'components.link', true>;
    linksTitle: Attribute.String;
    iconLinks: Attribute.Component<'components.icon-link', true>;
  };
}

export interface LayoutNavbar extends Schema.Component {
  collectionName: 'components_layout_navbars';
  info: {
    displayName: 'Navbar';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    logo: Attribute.Media<'images'>;
    links: Attribute.Component<'components.link', true>;
  };
}

export interface MetaMeta extends Schema.Component {
  collectionName: 'components_meta_metas';
  info: {
    displayName: 'Meta';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'components.carousel': ComponentsCarousel;
      'components.icon-link': ComponentsIconLink;
      'components.link': ComponentsLink;
      'components.quote': ComponentsQuote;
      'components.rich-text': ComponentsRichText;
      'components.text-with-image': ComponentsTextWithImage;
      'layout.about-me': LayoutAboutMe;
      'layout.footer': LayoutFooter;
      'layout.navbar': LayoutNavbar;
      'meta.meta': MetaMeta;
    }
  }
}
