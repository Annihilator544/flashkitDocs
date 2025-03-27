import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Design Anything Fast',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Flashkit offers an intuitive, template-driven design experience so you can
        create stunning social media graphics, YouTube previews, Instagram posts,
        and more—fast and hassle-free.
      </>
    ),
  },
  {
    title: 'Built-In Social Integration',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Connect your Instagram, YouTube, or TikTok accounts and share your
        creations directly. Flashkit also provides engagement analytics and EQS
        scoring to help optimize your content strategy.
      </>
    ),
  },
  {
    title: 'Powered by Cloud & Canvas',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Design with the Plotono-powered canvas, save projects to the cloud, and
        access your work from anywhere. Flashkit uses AWS and Firebase to ensure
        your content is secure, fast, and always available.
      </>
    ),
  },
];


function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
