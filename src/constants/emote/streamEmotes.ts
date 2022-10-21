import { IStreamEmoteButton } from "../../contracts/streamEmoteButton";
import { EmoteButton } from './emoteButton';
import { EmoteTag } from './emoteTags';

export const StreamAvailableEmotes: Array<IStreamEmoteButton> = [
    {
        id: EmoteButton.sClass,
        imageUrl: '/assets/img/emotes/nms/classS.png',
        tags: [EmoteTag.default, EmoteTag.nms],
        sortOrder: 10,
    },
    {
        id: EmoteButton.aClass,
        imageUrl: '/assets/img/emotes/nms/classA.png',
        tags: [EmoteTag.default, EmoteTag.nms],
        sortOrder: 20,
    },
    {
        id: EmoteButton.ok,
        imageUrl: '/assets/img/emotes/nms/ok.png',
        tags: [EmoteTag.default, EmoteTag.nms],
        sortOrder: 30,
    },
    {
        id: EmoteButton.corruptedDrone,
        imageUrl: '/assets/img/emotes/nms/corruptedDrone.png',
        tags: [EmoteTag.default, EmoteTag.nms],
        sortOrder: 40,
    },
    {
        id: EmoteButton.seanMindBlown,
        imageUrl: '/assets/img/emotes/nms/seanMindBlown.png',
        tags: [EmoteTag.default, EmoteTag.nms],
        sortOrder: 50,
    },
    {
        id: EmoteButton.seanHead,
        imageUrl: '/assets/img/emotes/nms/seanHead.png',
        tags: [EmoteTag.default, EmoteTag.nms],
        sortOrder: 60,
    },
    {
        id: EmoteButton.bunnyheart,
        imageUrl: '/assets/img/emotes/bunnyheart.png',
        tags: [EmoteTag.default],
        sortOrder: 70,
    },
    {
        id: EmoteButton.yay,
        imageUrl: '/assets/img/emotes/yay.gif',
        tags: [EmoteTag.other, EmoteTag.default],
        sortOrder: 100,
    },
    {
        id: EmoteButton.ficsit,
        imageUrl: '/assets/img/emotes/ficsit.png',
        tags: [EmoteTag.default, EmoteTag.satisfactory],
        sortOrder: 80,
    },
    {
        id: EmoteButton.ficsitThumbsUp,
        imageUrl: '/assets/img/emotes/ficsitThumbsUp.png',
        tags: [EmoteTag.default, EmoteTag.satisfactory],
        sortOrder: 90,
    },
    {
        id: EmoteButton.stonks,
        imageUrl: '/assets/img/emotes/stonks.png',
        tags: [EmoteTag.default],
        sortOrder: 110,
    },
    {
        id: EmoteButton.pikaWhat,
        imageUrl: '/assets/img/emotes/pkawha.png',
        tags: [EmoteTag.default],
        sortOrder: 120,
    },
    {
        id: EmoteButton.amongUs,
        imageUrl: '/assets/img/emotes/amongus.png',
        tags: [EmoteTag.default],
        sortOrder: 130,
    },
    {
        id: EmoteButton.amongUsDance,
        imageUrl: '/assets/img/emotes/amongUsDance.gif',
        tags: [EmoteTag.default],
        sortOrder: 140,
    },
    {
        id: EmoteButton.report,
        imageUrl: '/assets/img/emotes/report.png',
        tags: [EmoteTag.default],
        sortOrder: 150,
    },
    {
        id: EmoteButton.facepalm,
        imageUrl: '/assets/img/emotes/facepalm.png',
        tags: [EmoteTag.other, EmoteTag.default],
        sortOrder: 160,
    },
    {
        id: EmoteButton.fakeNews,
        imageUrl: '/assets/img/emotes/fakeNews.png',
        tags: [EmoteTag.default],
        sortOrder: 170,
    },
    {
        id: EmoteButton.bro,
        imageUrl: '/assets/img/emotes/bro.png',
        tags: [EmoteTag.default],
        sortOrder: 180,
    },
    {
        id: EmoteButton.pressF,
        imageUrl: '/assets/img/emotes/pressF.png',
        tags: [EmoteTag.default],
        sortOrder: 190,
    },
    {
        id: EmoteButton.programming,
        imageUrl: '/assets/img/emotes/programming.gif',
        tags: [EmoteTag.default],
        sortOrder: 200,
    },

    // ----------------- Eddison -----------------
    {
        id: EmoteButton.eddisonLol,
        imageUrl: '/assets/img/emotes/eddisonLol.png',
        tags: [EmoteTag.other, EmoteTag.eddison],
        sortOrder: 71,
    },
    {
        id: EmoteButton.eddisonSir,
        imageUrl: '/assets/img/emotes/eddisonSir.png',
        tags: [EmoteTag.other, EmoteTag.eddison],
        sortOrder: 72,
    },
    {
        id: EmoteButton.eddisonLifeJacket,
        imageUrl: '/assets/img/emotes/eddisonLifeJacket.png',
        tags: [EmoteTag.other, EmoteTag.eddison],
        sortOrder: 73,
    },
    {
        id: EmoteButton.eddisonOnCouch,
        imageUrl: '/assets/img/emotes/eddisonOnCouch.png',
        tags: [EmoteTag.other, EmoteTag.eddison],
        sortOrder: 74,
    },

    // ----------------- NMS -----------------
    {
        id: EmoteButton.bClass,
        imageUrl: '/assets/img/emotes/nms/classB.png',
        tags: [EmoteTag.nms],
        sortOrder: 21,
    },
    {
        id: EmoteButton.cClass,
        imageUrl: '/assets/img/emotes/nms/classC.png',
        tags: [EmoteTag.nms],
        sortOrder: 22,
    },
    {
        id: EmoteButton.thumbsUp,
        imageUrl: '/assets/img/emotes/nms/thumbsUp.png',
        tags: [EmoteTag.nms],
        sortOrder: 23,
    },
    {
        id: EmoteButton.expPatchNull,
        imageUrl: '/assets/img/emotes/nms/expPatchNull.png',
        tags: [EmoteTag.nms],
        sortOrder: 24,
    },
    {
        id: EmoteButton.expPatchUnderwater,
        imageUrl: '/assets/img/emotes/nms/expPatchUnderwater.png',
        tags: [EmoteTag.nms],
        sortOrder: 24,
    },
    {
        id: EmoteButton.expPatchUnits,
        imageUrl: '/assets/img/emotes/nms/expPatchUnits.png',
        tags: [EmoteTag.nms],
        sortOrder: 24,
    },
    {
        id: EmoteButton.goldenGek,
        imageUrl: '/assets/img/emotes/nms/goldenGek.png',
        tags: [EmoteTag.nms],
        sortOrder: 24,
    },
    {
        id: EmoteButton.pioneerBadge,
        imageUrl: '/assets/img/emotes/nms/pioneerBadge.png',
        tags: [EmoteTag.nms],
        sortOrder: 24,
    },
    {
        id: EmoteButton.pioneerTrophy,
        imageUrl: '/assets/img/emotes/nms/pioneerTrophy.png',
        tags: [EmoteTag.nms],
        sortOrder: 24,
    },
    {
        id: EmoteButton.units,
        imageUrl: '/assets/img/emotes/nms/Units.png',
        tags: [EmoteTag.nms],
        sortOrder: 29,
    },
    {
        id: EmoteButton.nanites,
        imageUrl: '/assets/img/emotes/nms/nanites.png',
        tags: [EmoteTag.nms],
        sortOrder: 29,
    },
    {
        id: EmoteButton.waveAnomaly,
        imageUrl: '/assets/img/emotes/nms/waveAnomaly.png',
        tags: [EmoteTag.nms],
        sortOrder: 31,
    },
    {
        id: EmoteButton.wonder,
        imageUrl: '/assets/img/emotes/nms/wonder.png',
        tags: [EmoteTag.nms],
        sortOrder: 32,
    },
    {
        id: EmoteButton.atlas,
        imageUrl: '/assets/img/emotes/nms/atlas.png',
        tags: [EmoteTag.nms],
        sortOrder: 41,
    },

    // ----------------- Satisfactory -----------------
    {
        id: EmoteButton.ficsitHead,
        imageUrl: '/assets/img/emotes/ficsitEngineer.png',
        tags: [EmoteTag.other, EmoteTag.satisfactory],
        sortOrder: 91,
    },
    {
        id: EmoteButton.ficsitCoupon,
        imageUrl: '/assets/img/emotes/ficsitCoupon.png',
        tags: [EmoteTag.other, EmoteTag.satisfactory],
        sortOrder: 92,
    },

    // ----------------- Other -----------------
    {
        id: EmoteButton.catHands,
        imageUrl: '/assets/img/emotes/catHands.png',
        tags: [EmoteTag.other],
        sortOrder: 75,
    },
    {
        id: EmoteButton.cool,
        imageUrl: '/assets/img/emotes/cool.png',
        tags: [EmoteTag.other],
        sortOrder: 111,
    },
    {
        id: EmoteButton.coolThinking,
        imageUrl: '/assets/img/emotes/coolThinking.png',
        tags: [EmoteTag.other],
        sortOrder: 112,
    },
    {
        id: EmoteButton.yes,
        imageUrl: '/assets/img/emotes/yes.png',
        tags: [EmoteTag.other],
        sortOrder: 113,
    },
    {
        id: EmoteButton.no,
        imageUrl: '/assets/img/emotes/no.png',
        tags: [EmoteTag.other],
        sortOrder: 114,
    },
    {
        id: EmoteButton.hype,
        imageUrl: '/assets/img/emotes/hype.png',
        tags: [EmoteTag.other],
        sortOrder: 200,
    },
    {
        id: EmoteButton.kittyGun,
        imageUrl: '/assets/img/emotes/kittyGun.png',
        tags: [EmoteTag.other],
        sortOrder: 201,
    },
    {
        id: EmoteButton.dancingHamster,
        imageUrl: '/assets/img/emotes/dancingHamster.gif',
        tags: [EmoteTag.other],
        sortOrder: 202,
    },
    {
        id: EmoteButton.dancingPanda,
        imageUrl: '/assets/img/emotes/dancingPanda.gif',
        tags: [EmoteTag.other],
        sortOrder: 203,
    },
]



export const StreamAvailableEmotesForDash: Array<IStreamEmoteButton> = StreamAvailableEmotes.filter(sae => sae.tags.includes(EmoteTag.default))












