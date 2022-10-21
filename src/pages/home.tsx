import React, { useState } from 'react';

import { Wrapper } from '../constants/wrapperStyleType';
import { Header } from '../components/common/header';
import { Banner } from '../components/common/banner';
import { Navbar } from '../components/common/navbar';
import { Footer } from '../components/common/footer';
import { StreamEmote } from '../components/streamEmotes/streamEmote';
import { VideoColumnSection } from '../components/videoColumnSection';
import { site } from '../constants/site';
import { BasicLink } from '../components/core/link';

export const HomePage: React.FC = () => {
	const [showDrawer, setShowDrawer] = useState(false);
	return (
		<>
			<Header
				toggleDrawer={() => setShowDrawer(!showDrawer)}
			/>
			<Navbar
				showDrawer={showDrawer}
				toggleDrawer={() => setShowDrawer(!showDrawer)}
			/>
			<Banner videoUrl="/assets/vid/banner" />
			<div id="main">
				<StreamEmote wrapperClass={Wrapper.style2} />
				<VideoColumnSection
					title="More content"
					subtitleComponent={<p>Other content from <BasicLink href={site.stream.twitch}>KhaozTopsy</BasicLink> (<BasicLink href={site.assistantApps.website}>AssistantApps</BasicLink>)</p>}
					wrapperClass={Wrapper.style1}
					flexClass="flex-3"
					items={[
						{
							image: '/assets/img/moreContent/streamEmotesBlog.png',
							text: 'Blog post on how & why this website was built, without getting too technical.',
							link: 'https://blog.kurtlourens.com/stream-emojis-build-it-yourself/',
						},
						{
							image: '/assets/img/moreContent/patreonExclusive.png',
							text: 'Our Patreon page, If you can help me create more software please consider.',
							link: site.assistantApps.patreon,
						},
						{
							image: '/assets/img/moreContent/assistantAppsMeta.jpeg',
							text: 'Home page of the AssistantApps, all the currently available apps are listed here!',
							link: site.assistantApps.website,
						}
					]}
				/>
			</div>
			<Footer />
		</>
	);
}
