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

export interface ComponentsLink extends Schema.Component {
  collectionName: 'components_components_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    url: Attribute.String & Attribute.Required;
    text: Attribute.String & Attribute.Required;
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

export interface LayoutFooter extends Schema.Component {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    test: Attribute.String;
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
      'components.link': ComponentsLink;
      'components.quote': ComponentsQuote;
      'components.rich-text': ComponentsRichText;
      'layout.footer': LayoutFooter;
      'meta.meta': MetaMeta;
    }
  }
}
