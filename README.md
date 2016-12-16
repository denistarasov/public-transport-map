# public-transport-map

**Тарасов Денис Вадимович, группа БПМИ-155, тема "Схема общественного транспорта для Санкт-Петербурга"**

В первую очередь планируется сделать схему для метро. Для этого было проведено некое исследование имеющихся карт метро в интернете. Ниже описано, что было обнаружено:

- [официальная схема](http://www.metro.spb.ru/map1/files/rus.jpg) выглядит не сильно красиво, особенно на контрасте со схемой московского метрополитена;
<p align="center">
<img src="http://www.metro.spb.ru/uploads/img/risunki/map_shema_28_12_l.png" width=70%; height=70%;/>
</p>
- [схема](http://vignette3.wikia.nocookie.net/althistory/images/2/2a/%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3%D1%81%D0%BA%D0%BE%D0%B5_%D0%BC%D0%B5%D1%82%D1%80%D0%BE.png/revision/latest?cb=20140401121732&path-prefix=ru), нарисованная автором для своей статьи на тему альтернативной истории развития России, в частности, Петербургского метрополитена;
<p align="center">
<img src="http://vignette3.wikia.nocookie.net/althistory/images/2/2a/%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3%D1%81%D0%BA%D0%BE%D0%B5_%D0%BC%D0%B5%D1%82%D1%80%D0%BE.png/revision/latest?cb=20140401121732&path-prefix=ru" width=70%; height=70%;/>
</p>
- точная географическая [схема](http://www.metro.spb.ru/uploads/img/map/metromap2025.jpg), наложенная на настоящую карту Петербурга с официального сайта метро, на которой отражена стратегия развития метрополитена до 2025 года;
<p align="center">
<img align="center" src="http://image.prntscr.com/image/0b0fff8a3c4d4dd69b8a2e2bd31f7e90.png" alt="http://prnt.sc/dk3hmr" width=70%; height=70%;/>
</p>
- альтернативная [рисовка карты](http://img-fotki.yandex.ru/get/6521/84280170.32/0_7b6d4_e660a013_XXL.jpg) с "закруглением" веток метро;
<p align="center">
<img align="center" src="http://img-fotki.yandex.ru/get/6521/84280170.32/0_7b6d4_e660a013_XXL.jpg" width=70%; height=70%;/>
</p>
- [схема Лебедева](https://img.artlebedev.ru/everything/spb/metro-map/spb-metro-map.gif), выглядит довольно красиво;
<p align="center">
<img align="center" src="https://img.artlebedev.ru/everything/spb/metro-map/spb-metro-map.gif" width=70%; height=70%;/>
</p>
- приложение Яндекс.Метро.
<p align="center">
<img align="center" src="http://neva.today/uploads/12/06/04/o_%D0%BC%D0%B5%D1%82%D1%80%D0%BE.gif" width=70%; height=70%;/>
</p>

**Актуальность:** я родился в Санкт-Петербурге и с детства обожаю метро. Мне очень жаль, что в Москве руководство метрополитена обратилось в специальное дизайн-агентство, чтобы создать красивую и понятную схему. В Петербурге, в то же время, схема до сих пор выглядит несколько архаично (хотя в скором времени может быть и введут схему Лебедева). Поэтому мне хотелось бы создать такую схему, на которую приятно смотреть, которая была бы функциональной и которую можно делать автоматически. Автоматизация позволит меньше работы делать руками (сначала черновик делает компьютер, а потом дорабатывается дизайнерами) или не делать ничего вручную вовсе. Веб-приложение позволит наглядно продемонстрировать работу, т.к. с браузера может посмотреть практически каждый (независимо от платформы).

**Технологии:** планирую сделать все в JS, возможно, сбор данных будет осуществлен с помощью Python.

**Предполагаемые возможности** (список фич к возможной реализации, **жирным** отмечена сложность из 5 баллов):
- сбор данных с [Википедии](https://ru.wikipedia.org/wiki/%D0%9B%D0%B8%D0%BD%D0%B8%D0%B8_%D0%B8_%D1%81%D1%82%D0%B0%D0%BD%D1%86%D0%B8%D0%B8_%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%BC%D0%B5%D1%82%D1%80%D0%BE%D0%BF%D0%BE%D0%BB%D0%B8%D1%82%D0%B5%D0%BD%D0%B0), [OpenStreetMap](https://www.openstreetmap.org/) **[3/5]**;
- кратчайшее расстояние между двумя станциями (как в приложении Яндекс.Метро) **[2/5]**;
- возможность менять цвет, названия и масштаб **[3/5]**;
- остановки, которые находятся на заданном временном/географическом расстоянии от выбранной станции **[3/5]**;
- экспорт в картинку **[4/5]**;
- возможность посмотреть этапы развития метро по годам **[5/5]**;
- добавление еще каких-нибудь городов **[5/5]**.
