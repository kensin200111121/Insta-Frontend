import { statisticsForAdmin } from "@/interface/data/home.interface";
import getFormatedNumber, { getPriceNumber } from "@/utils/getFormatedNumber";
import { FC } from "react";

type StatisticsInfoForAdminProps = {
  info: statisticsForAdmin|undefined
}

const StatisticsInfoForAdmin: FC<StatisticsInfoForAdminProps> = ({info}) => {
  return (
    <>
      <div className="statistic-item">
        <div className="statistic-item-title">Total Locations</div>
        <div className="statistic-item-amount">{getFormatedNumber(info?.totalCount, 0)}</div>
      </div>
      <div className="statistic-item">
        <div className="statistic-item-title">Terminals Deployed</div>
        <div className="statistic-item-amount">{getFormatedNumber(info?.termianlCount, 0)}</div>
      </div>
      <div className="statistic-item">
        <div className="statistic-item-title">Debit Percent</div>
        <div className="statistic-item-amount">
          {getFormatedNumber(((info?.cardTypeTransactionsInfo?.['Debit']?.amount || 0) / (info?.totalAmount || 1)) * 100)}%
        </div>
      </div>
      <div className="statistic-item">
        <div className="statistic-item-title">Credit Percent</div>
        <div className="statistic-item-amount">
          {getFormatedNumber((info?.cardTypeTransactionsInfo?.['Credit']?.amount || 0) / (info?.totalAmount || 1) * 100)}%
        </div>
      </div>
      <div className="statistic-item">
        <div className="statistic-item-title">Debit Avg Ticket</div>
        <div className="statistic-item-amount text-info">
          {getPriceNumber((info?.cardTypeTransactionsInfo?.['Debit']?.amount || 0) / (info?.cardTypeTransactionsInfo?.['Debit']?.count || 1), 0)}
        </div>
      </div>
      <div className="statistic-item">
        <div className="statistic-item-title">Credit Avg Ticket</div>
        <div className="statistic-item-amount text-info">
          {getPriceNumber((info?.cardTypeTransactionsInfo?.['Credit']?.amount || 0) / (info?.cardTypeTransactionsInfo?.['Credit']?.count || 1), 0)}
        </div>
      </div>
      <div className="statistic-item">
        <div className="statistic-item-title">Visa % / Avg Ticket</div>
        <div className="statistic-item-amount">
          {`${getFormatedNumber((info?.cardBrandTransactionsInfo?.['VISA']?.amount || 0) / (info?.totalAmount || 1) * 100)}% / `}
          <span className="text-info">
            {getPriceNumber((info?.cardBrandTransactionsInfo?.['VISA']?.amount || 0) / (info?.cardBrandTransactionsInfo?.['VISA']?.count || 1), 0)}
          </span>
        </div>
      </div>
      <div className="statistic-item">
        <div className="statistic-item-title">MasterCard % / Avg Ticket</div>
        <div className="statistic-item-amount">
          {`${getFormatedNumber((info?.cardBrandTransactionsInfo?.['MASTERCARD']?.amount || 0) / (info?.totalAmount || 1) * 100)}% / `}
          <span className="text-info">
            {getPriceNumber((info?.cardBrandTransactionsInfo?.['MASTERCARD']?.amount || 0) / (info?.cardBrandTransactionsInfo?.['MASTERCARD']?.count || 1), 0)}
          </span>
        </div>
      </div>
      <div className="statistic-item">
        <div className="statistic-item-title">Discover % / Avg Ticket</div>
        <div className="statistic-item-amount">
          {`${getFormatedNumber((info?.cardBrandTransactionsInfo?.['DISCOVER']?.amount || 0) / (info?.totalAmount || 1) * 100)}% / `}
          <span className="text-info">
            {getPriceNumber((info?.cardBrandTransactionsInfo?.['DISCOVER']?.amount || 0) / (info?.cardBrandTransactionsInfo?.['DISCOVER']?.count || 1), 0)}
          </span>
        </div>
      </div>
      <div className="statistic-item">
        <div className="statistic-item-title">Amex % / Avg Ticket</div>
        <div className="statistic-item-amount">
          {`${getFormatedNumber((info?.cardBrandTransactionsInfo?.['AMEX']?.amount || 0) / (info?.totalAmount || 1) * 100)}% / `}
          <span className="text-info">
            {getPriceNumber((info?.cardBrandTransactionsInfo?.['AMEX']?.amount || 0) / (info?.cardBrandTransactionsInfo?.['AMEX']?.count || 1), 0)}
          </span>
        </div>
      </div>
    </>
  )
}

export default StatisticsInfoForAdmin;