import React from "react";
import {
    GlobalOutlined,
    GithubOutlined,
    FilePdfOutlined,
    FileSearchOutlined,
    RedditOutlined,
    SendOutlined,
    FacebookOutlined,
    YoutubeOutlined,
    TwitterOutlined,
    InstagramOutlined,
    MediumOutlined,
    WeiboOutlined,
    CustomerServiceOutlined,
    WechatOutlined,
} from "@ant-design/icons";

export const allLinkTypes = [
    {
        iconText: "website",
        icon: <GlobalOutlined />,
    },
    {
        iconText: "github",
        icon: <GithubOutlined />,
    },
    {
        iconText: "reddit",
        icon: <RedditOutlined />,
    },
    {
        iconText: "explorer",
        icon: <FileSearchOutlined />,
    },
    {
        iconText: "whitepaper",
        icon: <FilePdfOutlined />,
    },
    {
        iconText: "youtube",
        icon: <YoutubeOutlined />,
    },
    {
        iconText: "twitter",
        icon: <TwitterOutlined />,
    },
    {
        iconText: "facebook",
        icon: <FacebookOutlined />,
    },
    {
        iconText: "instagram",
        icon: <InstagramOutlined />,
    },
    {
        iconText: "telegram",
        icon: <SendOutlined />,
    },
    {
        iconText: "medium",
        icon: <MediumOutlined />,
    },
    {
        iconText: "discord",
        icon: <CustomerServiceOutlined />,
    },
    {
        iconText: "sina-weibo",
        icon: <WeiboOutlined />,
    },
    {
        iconText: "wechat",
        icon: <WechatOutlined />,
    },
];

export const myCryptoLinks = (data) => {
    let allLinks = [];

    data?.map(link => {
        const { type } = link;

        if (type.toLowerCase() === 'github') {
            link.iconText = type;
            link.icon = <GithubOutlined />

            allLinks.push(link);
        } else if (type.toLowerCase() === 'reddit') {
            link.iconText = type;
            link.icon = <RedditOutlined />

            allLinks.push(link);
        } else if (type.toLowerCase() === 'explorer') {
            link.iconText = type;
            link.icon = <FileSearchOutlined />

            allLinks.push(link);
        } else if (type.toLowerCase() === 'whitepaper') {
            link.iconText = type;
            link.icon = <FilePdfOutlined />

            allLinks.push(link);
        } else if (type.toLowerCase() === 'youtube') {
            link.iconText = type;
            link.icon = <YoutubeOutlined />

            allLinks.push(link);
        } else if (type.toLowerCase() === 'twitter') {
            link.iconText = type;
            link.icon = <TwitterOutlined />

            allLinks.push(link);
        } else if (type.toLowerCase() === 'facebook') {
            link.iconText = type;
            link.icon = <FacebookOutlined />

            allLinks.push(link);
        } else if (type.toLowerCase() === 'instagram') {
            link.iconText = type;
            link.icon = <InstagramOutlined />

            allLinks.push(link);
        } else if (type.toLowerCase() === 'telegram') {
            link.iconText = type;
            link.icon = <SendOutlined />

            allLinks.push(link);
        } else if (type.toLowerCase() === 'medium') {
            link.iconText = type;
            link.icon = <MediumOutlined />

            allLinks.push(link);
        } else if (type.toLowerCase() === 'discord') {
            link.iconText = type;
            link.icon = <WeiboOutlined />

            allLinks.push(link);
        } else if (type.toLowerCase() === ('sina-weibo' || 'weibo')) {
            link.iconText = type;
            link.icon = <CustomerServiceOutlined />

            allLinks.push(link);
        } else if (type.toLowerCase() === 'wechat') {
            link.iconText = type;
            link.icon = <WechatOutlined />

            allLinks.push(link);
        } else {
            link.iconText = 'website';
            link.icon = <GlobalOutlined />

            allLinks.push(link);
        }
    })

    return allLinks;
};